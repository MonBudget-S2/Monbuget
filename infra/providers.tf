provider "google" {
  project = var.project_id
  region  = var.region
}

terraform {
  backend "gcs" {
    bucket = "monbuget_cloudbuild"
    prefix = "source"
  }
}