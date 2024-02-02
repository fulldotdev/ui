---
title: Introduction to components
sidebar:
  order: 1000
description: A reference page in my new Starlight docs site.
---

## Default files

All `components` have a `Section` and a [CloudCannon](https://cloudcannon.com) [bookshop](https://github.com/CloudCannon/bookshop) yaml file.

The `Section` renders the component and needs relevant props.

## Additional files

Components may also include `Deck` and `Card` files, these two always come in a pair and never alone. 

The `Card` is used to render a single instance of that specified component. While `Deck` is used to render multiple instances of `Card`.
