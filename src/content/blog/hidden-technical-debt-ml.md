---
title: Hidden technical debt in ML, read from inside a production app
date: 2026-11-22
tag: AI / ML
minutes: 8
summary: The 2015 Google paper says the model is a small box in a big system. Six of its debts, and the cheap habits I use to avoid them when an ML model lives inside a business app.
---

In 2015 a group of Google engineers published *Hidden Technical Debt in Machine Learning Systems* (Sculley et al., NeurIPS). Its best-known figure is a big diagram of an ML system where the actual model code is a tiny black box in the middle. Everything around it (data collection, feature extraction, serving, monitoring, configuration) is where the work and the bugs are.

I re-read it this week while studying cloud-native ML at BITS, and it reads less like theory and more like a checklist for anyone who puts a model into a real product. Here are the six debts I see most often, and the cheap habit that pays each one down.

## 1. Entanglement: change anything, change everything

The paper calls it **CACE**: *Changing Anything Changes Everything*. Add one feature, rescale another, or drop a rare category, and the model's behaviour shifts everywhere, not just where you meant it to.

**Habit:** never change features and retrain in the same step as anything else. Keep a fixed evaluation set and compare the old and new model on it, per segment (per branch, per vehicle type, per customer group), not only on the overall score. A 0.5% gain overall can hide a 10% loss in one segment.

## 2. Undeclared consumers

You expose a prediction through an API. Six months later another team reads it from the database for their own report, and nobody told you. Now your next model improvement silently breaks their numbers.

**Habit:** serve predictions through one documented endpoint, store the **model version** next to every prediction, and treat the output like any other public API: versioned, with a changelog.

## 3. Unstable data dependencies

Models often depend on a column someone else owns: a status code, a free-text field, a lookup table. The owner renames a value or changes how it is filled, and your model's input changes meaning overnight with no error anywhere.

**Habit:** validate inputs at the API boundary. Types, ranges, allowed categories and null rates. If more than a few percent of requests fail validation in an hour, alert. A model fails silently. The validation layer should fail loudly.

## 4. Glue code and pipeline jungles

The paper estimates that mature ML systems are about 5% ML code and 95% glue. The danger is that the glue grows by copy-paste: one feature script for training, a second for the batch job, a third inside the API.

**Habit:** one feature function, imported by both training and serving. If the API computes `age_in_months` differently from the notebook, you have **training/serving skew**, the most common reason a model that looked great offline is wrong in production.

```python
# features.py: the only place features are defined
def build_features(row: dict) -> dict:
    return {
        "age_months": months_between(row["registered_on"], row["inspected_on"]),
        "km_per_year": row["odometer_km"] / max(row["age_years"], 0.5),
        "severity": SEVERITY_MAP.get(row["defect_severity"], 0),
    }
```

## 5. Feedback loops

Once a model's output changes what happens in the world, the next training data is shaped by the model itself. A price suggestion that inspectors always accept becomes "the truth" in next year's data.

**Habit:** log when a human **overrides** the model, and keep that as a first-class metric. Rising overrides are both your drift alarm and your most honest training labels.

## 6. Configuration debt

Thresholds, feature flags, which model file to load, which categories to drop: these end up spread across env files, database rows and hard-coded constants. The paper points out that config often has more lines than the model code and gets far less review.

**Habit:** keep model config in one versioned file next to the model artefact, and load both together. "Model v7" should mean one exact set of weights *and* thresholds.

## The takeaway

None of these fixes needs a feature store or a big MLOps platform. They are ordinary software habits applied to a component that fails quietly: version it, validate its inputs, define features once, measure overrides, and keep its config in one place. The model is the small box. Most of the engineering is in the big one around it.
