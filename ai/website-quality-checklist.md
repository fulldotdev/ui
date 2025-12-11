# Website Quality Checklist

If you're an AI, run this checklist **without scripts or commands** except when it is explicitly stated. Also don't generate a report file, just fix the issues.

## Automated Tests

Run the following commands to check for errors:

- [ ] `pnpm check` - no errors
- [ ] `pnpm build` - no errors

## Content

Look at all files in src/content/ and check for:

- [ ] No placeholder text (dots, TODOs, temp text)
- [ ] No empty headers
- [ ] No trailing whitespace
- [ ] No spelling/grammar errors
- [ ] All page titles approximately 50-60 characters
- [ ] All page descriptions approximately 150-160 characters
- [ ] All image paths are relative (not absolute)
- [ ] All images have descriptive alt text

## Links

Run `pnpm dev`, open the website in the browser on the port logged after the dev command. Based on src/content/pages/\*\* you should be able to navigate to all pages and check for:

- [ ] No broken links
- [ ] Website is responsive
- [ ] No errors or logs in console
- [ ] No missing images
- [ ] No weird layout issues
