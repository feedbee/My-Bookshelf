# Changelog

User- and operator-facing changes. GitHub Release notes are generated from the
matching version section. The first tagged release uses the existing package
version as its baseline.

## [Unreleased]

## [1.0.0] - 2026-11-12

### Added

- Publish multi-platform container releases to Amazon ECR from version tags.
  Each GitHub Release records the image digest and includes a deployment manifest.

### Changed

- Build and run the application on Node.js 24. The container reads its MongoDB
  connection string from the mounted runtime configuration.

### Fixed

- Keep book positions consistent when moving books within a shelf.
- Validate bookshelf API input and return safe errors for invalid requests.
- Delete a shelf's books when deleting the shelf.

### Security

- Update Mongoose to 9.12.1, which includes the fix for CVE-2026-125119.
- Update production dependencies including Express, body-parser, Handlebars,
  proxy-addr, and brace-expansion.

### Deployment notes

- Use the versioned image digest from the GitHub Release to deploy or roll back.
  The runtime configuration remains a read-only mount at `/app/config/config.json`.
