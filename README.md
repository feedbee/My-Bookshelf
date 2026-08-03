# My Bookshelf

This project was originally conceived as a general-purpose web application where multiple users could maintain and publish their reading histories. Development stalled at the stage of the author's personal bookshelf. There are several possible directions for future development, but for now the project is preserved and operated in the form that powers the existing bookshelf.

## Current state

The `v2` branch corresponds to the code currently used in production.

The backend lives in `core` and uses Node.js 14, TypeScript, Express, Handlebars, MongoDB, and Mongoose. During the Docker build, TypeScript is compiled into `dist`. The final image contains the compiled application, production dependencies, templates, and static assets.

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

## Publishing to Amazon ECR

Set the AWS profile, region, ECR repository name, and image tag:

```bash
export AWS_PROFILE=my-aws
export AWS_REGION=eu-central-1
export ECR_REPOSITORY=my-bookshelf
export IMAGE_TAG=latest
```

Obtain the real AWS Account ID from the selected profile and construct the image address:

```bash
export AWS_ACCOUNT_ID="$(aws sts get-caller-identity \
  --profile "$AWS_PROFILE" \
  --query Account \
  --output text)"

export ECR_REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
export ECR_IMAGE="${ECR_REGISTRY}/${ECR_REPOSITORY}:${IMAGE_TAG}"
```

Verify that the repository exists:

```bash
aws ecr describe-repositories \
  --profile "$AWS_PROFILE" \
  --region "$AWS_REGION" \
  --repository-names "$ECR_REPOSITORY"
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

- Node.js 14 has reached end of life.
- The project dependencies are outdated and contain known vulnerabilities.
- The application currently reflects the author's personal bookshelf use case, although its model and API leave room for further development.
- Runtime upgrades, dependency updates, and cleanup of historical code are left for future work.
