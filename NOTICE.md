# Notices

This file contains notices for some releases. If this file contains a section for a given release, it will be automatically included in the release notes above the generated changelog.

## v3.0.0

This release contains breaking changes and requires Gatus `>= v5.23.0`.

### New announcement feature

Fancy Gatus now uses the new announcement feature included in Gatus. Therefore the `notice` section in the frontend config is no longer used. Please move your announcements/notices to the Gatus config before upgrading. This change also requires that the frontend can access the `/api/v1/config` endpoint of Gatus. Please adjust your proxy config accordingly; an example configuration can be found [here](https://github.com/BluemediaDev/fancy-gatus/blob/v3.0.0/docs/example-nginx.conf).
