#!/bin/sh

PKGNAME=AnyAppStart

cp $PKGNAME /usr/bin/
cp $PKGNAME.service /lib/systemd/system/
cp $PKGNAME@.service /lib/systemd/system/