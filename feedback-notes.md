## Git-ish stuff

- Great descriptive messages!
- Looks like well-sized commits, too
- Standardize commit message format, for example [this one](https://seesparkbox.com/foundry/semantic_commit_messages)
- Well-named, tagged, assigned issues, ditto for PRs
- Approval mechanism in github—i.e. reviewers for each PR
- Could update your README to reflect your project

**getting changes from master into a feature branch**

Assuming you're currently on `working-branch`...

```bash
git checkout master
git pull origin master
git checkout working-branch
git merge master
```

...at which point it may automatically merge, and you may need to write a merge commit message. OR you may have to resolve merge conflicts (then `git commit` afterwards).

Afterwards, you may want to `push` your `working-branch` again, i.e.: `git push origin working-branch` (probably only if that branch is already up there for a PR).

## Models

- Consider an Address model / table (or could just be a string)

## Code style

- Pay more attention to linter issues
