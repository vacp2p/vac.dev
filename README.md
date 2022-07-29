# Vac.dev Website

Made and deployed with [logos site-builder](https://github.com/acid-info/logos-site-builder).

# Continuous Deloyment

- `staging` branch is deployed to [staging.vac.dev](https://staging.vac.dev)
- `master` branch is deployed to [vac.dev](https://vac.dev)

# Change Process

1. Create a new working branch from `staging`: `git checkout staging; git checkout -b my-changes`;
2. Proceed with changes, push to `origin` and open a Pull Request against `staging`;
3. Once approved, merge pull request, check changes on [staging.vac.dev](https://staging.vac.dev);
4. Once ready to promote to live website, rebase master on staging: `git checkout master; git pull master; git rebase origin/staging; git push`.
