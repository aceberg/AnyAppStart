
# Change Log
All notable changes to this project will be documented in this file.

## [0.1.6] - 2025-07-09
### Fixed
- SSH zombie processes (also, updated README and [example/types.yaml](https://github.com/aceberg/AnyAppStart/blob/main/example/types.yaml))

## [0.1.5] - 2025-04-14
### Added
- Item Page
- Highlight sorted field
- Auto update for logs
- UI update

## [0.1.4] - 2025-04-02
### Added
- User defined command [#2](https://github.com/aceberg/AnyAppStart/issues/2)
- Variable `$ITEMNAME` now can be used in `SSH` too
- Vite config update
- Optimized Docker build

### Fixed
- Alpine goreleaser binary

## [0.1.3] - 2025-03-07
### Added
- SSH from Docker container
- CPU, Memory stat
- Toast notification on Start/Stop/Restart
- New `types.yaml` example

## Fixed
- Set `NODEPATH` with `-n` option

## [0.1.2] - 2025-01-09
### Added
- MobX store
- Goroutine for getting states
- Icons for items
- Filter and Sort update

## [0.1.1] - 2025-01-08
### Added
- Variable `$ITEMNAME`
- Logs isLoading state

## [0.1.0] - 2025-01-03
### Added
- First binary release with `goreleaser`

### Fixed
- Edit item bug