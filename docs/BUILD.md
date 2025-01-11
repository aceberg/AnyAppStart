# For developers

This app has separate frontend (`React`) and backend (`Go`). You need to run both of them to see modifications while editing the code.

## Dev

1. Backend
```sh
cd backend/  #
make check   # check golang code
make run     # run backend
```
The backend needs to be restarted to apply any modifications to it!

2. Frontend
```sh
cd frontend/
npm i        # install node modules
npm run dev  # run frontend
```
Make sure the `api` port in `frontend/src/functions/api.tsx` is the same the backend uses.

## Build
To build the app in a single file, there is a `frontend/Makefile`:
```sh
cd frontend/
make all
```
Edit the `api` port in the Makefile if needed.   

Then I just push the code to Github and let Actions build Docker and Binary files for me=)

### Build locally
To build binary locally, after the steps above, run:

```sh
cd backend/
make go-build
```
Binary file will be in `backend/tmp/AnyAppStart`