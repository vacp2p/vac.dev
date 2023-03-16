# Vac.dev Website

Made and deployed with [logos site-builder](https://github.com/acid-info/logos-site-builder).

# Continuous Deloyment

* `master` branch is deployed to https://vac.dev by [CI](https://ci.infra.status.im/job/website/job/vac.dev/)
- `develop` branch is deployed to https://dev.vac.dev by [CI](https://ci.infra.status.im/job/website/job/dev.vac.dev/)

# Change Process

1. Create a new working branch from `develop`: `git checkout develop; git checkout -b my-changes`;
2. Proceed with changes, push to `origin` and open a Pull Request against `develop`;
3. Once approved, merge pull request, check changes on [dev.vac.dev](https://dev.vac.dev);
4. Once ready to promote to live website, rebase master on staging: `git checkout master; git pull master; git rebase origin/develop; git push`.

# Copyright

For all research posts under https://vac.dev/research, copyright and related rights are waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
