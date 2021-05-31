<p align="center">
  <a href="https://github.com/geislabs/geis">
    <img alt="geis" src="https://via.placeholder.com/1050x500" width="435">
  </a>
</p>

<p align="center">
  Robust data integration and processing libray for NodeJS.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@geislabs/geis">
    <img alt="Hex Version" src="https://img.shields.io/npm/v/@geislabs/geis.svg">
  </a>
  <a href="https://github.com/geislabs/geis/actions">
    <img alt="CI Status" src="https://github.com/geislabs/geis/workflows/ci/badge.svg">
  </a>
  <a href="https://opensource.org/licenses/Apache-2.0">
    <img alt="Apache 2 License" src="https://img.shields.io/npm/l/geis">
  </a>
  <a href="https://codecov.io/gh/geislabs/geis">
    <img src="https://codecov.io/gh/geislabs/geis/branch/master/graph/badge.svg?token=CYpB9H2ah3"/>
  </a>
</p>

### Data Types

| Package | Version | Dependencies |
|--------|-------|------------|
| [`@geis/json`](/packages/geis-json) | [![npm](https://img.shields.io/npm/v/@geislabs/geis-json.svg?maxAge=3600)](https://www.npmjs.com/package/@babel/core) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-core)](https://david-dm.org/babel/babel?path=packages/babel-core) |
| [`@geis/html`](/packages/geis-html) | [![npm](https://img.shields.io/npm/v/@geislabs/geis-html.svg?maxAge=3600)](https://www.npmjs.com/package/@babel/parser) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-parser)](https://david-dm.org/babel/babel?path=packages/babel-parser) |



### Protocols

| Package | Version | Dependencies |
|--------|-------|------------|
| [`@geis/fetch`](/packages/geis-fetch) | [![npm](https://img.shields.io/npm/v/@geislabs/geis-fetch.svg?maxAge=3600)](https://www.npmjs.com/package/@babel/core) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-core)](https://david-dm.org/babel/babel?path=packages/babel-core) |
| [`@geis/browse`](/packages/geis-browse) | [![npm](https://img.shields.io/npm/v/@geislabs/geis-browse.svg?maxAge=3600)](https://www.npmjs.com/package/@babel/parser) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-parser)](https://david-dm.org/babel/babel?path=packages/babel-parser) |
| [`@geis/open`](/packages/geis-open) | [![npm](https://img.shields.io/npm/v/@geislabs/geis-open.svg?maxAge=3600)](https://www.npmjs.com/package/@babel/traverse) | [![Dependency Status](https://david-dm.org/babel/babel.svg?path=packages/babel-traverse)](https://david-dm.org/babel/babel?path=packages/babel-traverse) |

<br/>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Install](#install)
- [Key Features](#key-features)
    - [Advantages Over Other Tools](#advantages-over-other-tools)

---

_Note: This README is for the unreleased master branch, please reference the
[official documentation on NPM][hexdoc] for the latest stable release._

[hexdoc]: https://hexdocs.pm/oban/Geis.html

---

## Install

```bash
npm install geis --save
```

## Key Features

Geis' primary goals are **reliability**, **consistency** and **observability**.

It is fundamentally different from other background job processing tools because
_it retains job data for historic metrics and inspection_. You can leave your
application running indefinitely without worrying about jobs being lost or
orphaned due to crashes.

#### Advantages Over Other Tools

- **Fewer Dependencies** — If you are running a web app there is a _very good_
  chance that you're running on top of a [RDBMS][rdbms]. Running your job queue
  within PostgreSQL minimizes system dependencies and simplifies data backups.

- **Transactional Control** — Enqueue a job along with other database changes,
  ensuring that everything is committed or rolled back atomically.

- **Database Backups** — Jobs are stored inside of your primary database, which
  means they are backed up together with the data that they relate to.
