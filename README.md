# My Bookshelf

This project was originally conceived as a general-purpose web application where multiple users could maintain and publish their reading histories. Development stalled at the stage of the author's personal bookshelf. There are several possible directions for future development, but for now the project is preserved and operated in the form that powers the existing bookshelf.

## Current state

The default branch is `master`. Releases publish the container to Amazon ECR.

The backend lives in `core` and uses Node.js 24, TypeScript, Express, Handlebars, MongoDB, and Mongoose. During the Docker build, TypeScript is compiled into `dist`. The final image contains the compiled application, production dependencies, templates, and static assets.

The application:

- listens on port `3001` when `PORT=3001` is provided;
- accepts external connections when `HOST=0.0.0.0` is provided;
- renders a bookshelf at `/shelf/:shelfKey`;
- exposes its API under `/api/v1/...`;
- serves CSS and images from `core/public`;
- expects external routing through nginx, so a `/` route may not exist;
- reads its MongoDB, base URL, and cover storage settings from `config/config.json`.

The `core/config/config.json` file contains local or production configuration. It is not stored in Git, is excluded from the Docker build context, and is mounted into the container as a read-only bind mount.

## Local build

Run all Docker commands from `core`:

```bash
cd core
docker build -t my-bookshelf:test .
```

Run the application with the local configuration file:

```bash
docker run --rm \
  --name my-bookshelf-test \
  -e HOST=0.0.0.0 \
  -e PORT=3001 \
  -p 3001:3001 \
  --mount type=bind,source="$PWD/config/config.json",target=/app/config/config.json,readonly \
  my-bookshelf:test
```

After startup, a specific bookshelf is available at:

```text
http://localhost:3001/shelf/<shelfKey>
```

## Multi-architecture build

Verify the build for both x86-64 and ARM without publishing an image:

```bash
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  --output type=cacheonly \
  .
```

A multi-architecture image cannot be imported into the local Docker image store with `--load`. A shared manifest for both architectures is created when the image is published to a registry with `--push`.

## GitHub Actions

**Container CI** runs tests, audits production dependencies, and builds the image for amd64 and arm64 on pull requests and pushes to `master`. **Release to ECR** runs the same checks when a stable SemVer tag is pushed.

## Prepare and publish a release

1. Review the changes since the previous release tag. Choose a SemVer bump and run `npm --prefix core version <version> --no-git-tag-version` to keep the package and lockfile in sync. The first tagged release uses the existing version `1.0.0`.
2. Record the user-visible and deployment changes in [CHANGELOG.md](CHANGELOG.md) under `## [<version>] - YYYY-MM-DD`. Move relevant entries from `Unreleased`. The workflow uses this section as the GitHub Release body.
3. Run `node scripts/release.mjs verify v<version>` and `npm --prefix core test`. Commit the version and changelog and land the release commit on `master`.
4. Create and push the annotated release tag on the verified commit.

   ```bash
   git tag -a v1.0.0 <release-commit> -m "My Bookshelf 1.0.0"
   git push origin refs/tags/v1.0.0
   ```

The workflow checks that the tag matches the package and lockfile and that the commit is in `master`. It publishes `MAJOR.MINOR.PATCH`, `MAJOR.MINOR`, and `latest` to ECR and creates a GitHub Release with the changelog notes and `release-manifest.json`. Deploy or roll back using the digest in that manifest. Use a new patch version to correct an existing release.

### GitHub release configuration

| Repository variable | Value |
| --- | --- |
| `AWS_REGION` | `us-east-2` |
| `API_ECR_REPOSITORY` | `my-bookshelf` |
| `AWS_ROLE_ARN` | ARN of the My-Bookshelf ECR publishing role |

The release job uses GitHub OIDC with audience `sts.amazonaws.com` and a tag subject matching `repo:feedbee/My-Bookshelf:ref:refs/tags/v*.*.*`. Restrict creation of release tags to authorized maintainers and prevent their update or deletion. The IAM trust pattern limits repository and ref scope, while the workflow validates the exact SemVer and commit ancestry.

## Publishing manually to Amazon ECR

Set the local AWS profile and image tag, and read the ECR destination from the GitHub repository variables:

```bash
export AWS_PROFILE=my-aws
AWS_REGION="$(gh variable get AWS_REGION --repo feedbee/My-Bookshelf)" &&
API_ECR_REPOSITORY="$(gh variable get API_ECR_REPOSITORY --repo feedbee/My-Bookshelf)" &&
export AWS_REGION API_ECR_REPOSITORY
export IMAGE_TAG=latest
```

Obtain the real AWS Account ID from the selected profile and construct the image address:

```bash
export AWS_ACCOUNT_ID="$(aws sts get-caller-identity \
  --profile "$AWS_PROFILE" \
  --query Account \
  --output text)"

export ECR_REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
export ECR_IMAGE="${ECR_REGISTRY}/${API_ECR_REPOSITORY}:${IMAGE_TAG}"
```

Verify that the repository exists:

```bash
aws ecr describe-repositories \
  --profile "$AWS_PROFILE" \
  --region "$AWS_REGION" \
  --repository-names "$API_ECR_REPOSITORY"
```

Authenticate Docker with ECR:

```bash
aws ecr get-login-password \
  --profile "$AWS_PROFILE" \
  --region "$AWS_REGION" \
| docker login \
  --username AWS \
  --password-stdin "$ECR_REGISTRY"
```

Build and publish a single image for both `amd64` and `arm64`:

```bash
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  --tag "$ECR_IMAGE" \
  --push \
  .
```

Inspect the published manifest:

```bash
docker buildx imagetools inspect "$ECR_IMAGE"
```

The resulting manifest should contain both `linux/amd64` and `linux/arm64`.

## Known limitations

- The application currently reflects the author's personal bookshelf use case, although its model and API leave room for further development.
