terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "4.51.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~>2.16.0"
    }
  }
}

provider "google" {
  credentials = file("<NAME>.json")
  project = "${secrets.idprovider}"
  region  = "eu-west9"
}

resource "google_compute_network" "vpc_network" {
  name = "terraform-network"
}
resource "google_storage_bucket" "bucket" {
  name = "monbuget_cloudbuild"
}


