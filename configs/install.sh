#!/bin/sh

PKGNAME=QuickStart

cp $PKGNAME /usr/bin/
cp $PKGNAME.service /lib/systemd/system/
cp $PKGNAME@.service /lib/systemd/system/