# Vac.dev Website

Originally created by [EthWorks](https://ethworks.io/).

# Development

- Install Depndencies:
  ```
  yarn install
  bundle install
  ```
- Build Website
  ```
  yarn run build
  ```
- For development or server:
  ```
  yarn run dev
  yarn run start
  ```

# Continuous Integration

- `develop` branch is pushed to [dev.vac.dev](https://dev.vac.dev) via [this CI Job](https://ci.status.im/job/website/job/dev.vac.dev/)
- `master` branch is pushed to [vac.dev](https://vac.dev) via [this CI Job](https://ci.status.im/job/website/job/vac.dev/)

# Change Process

1. Create a new working branch from `develop`: `git checkout develop; git checkout -b my-changes`,
2. Proceed with changes, push to `origin` and open a Pull Request against `develop`,
3. Once approved, merge pull request, check changes on [dev.vac.dev](https://dev.vac.dev),
4. Once ready to promote to live website, rebase master on develop: `git checkout master; git pull master; git rebase origin/develop; git push`.


# Known Issues

### Bundler and Jekyll on Apple M1 (with Ruby `x86_64`)

```sh
arch -x86_64 gem install --user-install bundler jekyll
echo 'export PATH="~/.gem/ruby/2.6.0/bin:$PATH"' >> ~/.zshrc
bundle update
```
