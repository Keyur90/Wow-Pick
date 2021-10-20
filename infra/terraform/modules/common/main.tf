locals {
  common_tags = {
    Application        = "Wowpick"
    CostCentre         = "6380"
    Environment        = var.environment
    Owner              = "WOW ECF"
    Platform           = "IAAS"
    System             = "ECF"
    Support            = "wowdigitaldevops@woolworths.com.au"
    Team               = "Transformers"
    Source             = "terraform"
    ProjectName        = var.application_name
    GitRepoUrl         = var.git_repo_url
  }
  location_name = lookup(var.resource_locations, var.region, "Cannot find a resource location name!")
}
