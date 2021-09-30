# templator-examples

## Install templator

```
npm i -g @gitops-toolbox/templator
```

## Test on gitconfig

```
tp -b gitconfigs context
cd gitconfigs
tp list mappings
tp list templates
tp generate gitconfigs.js -h
tp generate gitconfigs.js -j
```