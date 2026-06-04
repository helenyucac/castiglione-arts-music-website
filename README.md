# Castiglione Website

Official website prototype for Castiglione, an Australia-based touring production company focused on live orchestral anime and gaming concerts, classical recitals, and chamber music tours.

This project is built with Next.js App Router, TypeScript, Tailwind CSS, and is prepared for Vercel Preview deployments.

## Local Requirements

- Node.js 20 or newer
- pnpm

If pnpm is not installed, install it first:

```bash
npm install -g pnpm
```

## Install

From the project folder:

```bash
pnpm install
```

## Local Development

Start the local preview:

```bash
pnpm dev
```

Then open:

```text
http://localhost:3000
```

Before sharing changes, run:

```bash
pnpm typecheck
pnpm build
```

If any command shows an error, copy the full error text and paste it back into Codex.

## Project Scripts

```json
{
  "dev": "next dev --webpack",
  "build": "next build --webpack",
  "lint": "eslint .",
  "typecheck": "tsc --noEmit"
}
```

## Replacing the Hero Video

The hero banner is controlled in:

```text
app/page.tsx
components/HeroVideo.tsx
```

Recommended steps:

1. Put the video file in `public/media/`, for example:

```text
public/media/hero.mp4
```

2. Update `app/page.tsx`:

```tsx
<HeroVideo
  videoSrc="/media/hero.mp4"
  posterSrc="/media/hero-poster.jpg"
/>
```

3. Put the poster image in `public/media/` too, for example:

```text
public/media/hero-poster.jpg
```

If `videoSrc` is not provided, the hero uses the poster image as a static placeholder.

## Replacing Tour Card Data and Images

Tour card content is managed in:

```text
data/tours.ts
```

Each card has:

```ts
{
  id: "unique-tour-id",
  category: "classical-recital",
  title: "Concert Title",
  date: "2026-11-12",
  dateLabel: "Nov 2026",
  cities: ["Sydney", "Melbourne", "Brisbane"],
  status: "on-sale",
  image: "/media/tours/example.jpg"
}
```

Recommended image workflow:

1. Put tour images in:

```text
public/media/tours/
```

2. Reference them like this:

```ts
image: "/media/tours/example.jpg"
```

The `date`, `category`, and `status` fields power the Highlights and Tours filters.

Use these normalized values:

- `category`: `anime-concert`, `gaming-concert`, or `classical-recital`
- `status`: `on-sale`, `upcoming`, or `past`
- `date`: sortable ISO date, for example `2026-11-12`
- `cities`: array of city names

Homepage filter logic:

- Default homepage state: all events, sorted newest to oldest by `date`
- `What's on`: events with `status: "on-sale"` or `status: "upcoming"`
- `Anime Concerts`: events with `category: "anime-concert"`
- `Gaming Concerts`: events with `category: "gaming-concert"`
- `Classical Recitals`: events with `category: "classical-recital"`
- `Past event`: events with `status: "past"`

Tours page filter logic:

- Default Tours page state: all events, sorted newest to oldest by `date`
- `Anime Concerts`: events with `category: "anime-concert"`
- `Gaming Concerts`: events with `category: "gaming-concert"`
- `Classical Recitals`: events with `category: "classical-recital"`

Card city formatting is handled in `components/TourCard.tsx` with:

```ts
tour.cities.join(", ")
```

The homepage displays up to 12 cards. The `/tours` page displays all events.

The Highlights card colors are intentionally controlled by `components/TourCard.tsx`, not by the tour data. They alternate between:

```text
#f9f9f9
#fdf9ee
```

## Replacing Social Media Links

Social links are managed in:

```text
components/SocialLinks.tsx
```

Replace the placeholder `href: "#"` values with the official URLs:

```ts
{ label: "Facebook", href: "https://facebook.com/your-page", icon: FaFacebookF }
```

The hero social icon row and Footer both use the same `socialLinks` data.

The hero social icons are rendered inside:

```text
components/HeroVideo.tsx
```

They are positioned over the video banner content area under the `View Highlights` button.

## Tours Page

The Tours page lives at:

```text
app/tours/page.tsx
```

Open it locally at:

```text
http://localhost:3000/tours
```

It uses the same event card layout as the homepage, but it does not limit the
number of visible events. Its filters only cover event types.

## About and Contact Pages

Static information pages live at:

```text
app/about/page.tsx
app/contact/page.tsx
```

The contact form front end is managed in:

```text
components/ContactForm.tsx
```

## Responsive Highlights Layout

The Highlights grid is controlled by custom CSS classes in:

```text
app/globals.css
app/site.css
components/HighlightsSection.tsx
components/TourCard.tsx
```

Current layout:

- Mobile: 2 columns
- Tablet: 3 columns
- Desktop: 4 columns

The card image ratio and information area height are fixed so the cards stay aligned.

## Deploying to Vercel Preview

Do not connect the official domain yet. Use Vercel Preview URLs until the full website is ready.

### 1. Push to GitHub

Open Terminal in the project folder:

```bash
git init
git add .
git commit -m "Build Castiglione homepage"
```

Create a new empty repository on GitHub, then follow GitHub's instructions to connect the local folder. It will look similar to:

```bash
git remote add origin https://github.com/YOUR-ACCOUNT/YOUR-REPO.git
git branch -M main
git push -u origin main
```

### 2. Connect to Vercel

1. Go to `https://vercel.com`.
2. Sign in with GitHub.
3. Click `Add New...`.
4. Choose `Project`.
5. Import the GitHub repository.
6. Vercel should detect Next.js automatically.
7. Confirm the settings:

```text
Framework Preset: Next.js
Install Command: pnpm install
Build Command: pnpm build
Output Directory: .next
```

8. Click `Deploy`.

### 3. Get the Preview URL

After deployment finishes, Vercel will show a URL similar to:

```text
https://castiglione-arts-music-git-main-yourname.vercel.app
```

That is the temporary preview link. You can open it on your phone or send it privately to collaborators.

Every new push to GitHub creates a new Vercel deployment. Pull requests and non-production branches also get their own Preview URLs.

## Binding the Official Domain Later

Only do this when the site is approved and ready to go public.

1. Open the Vercel project.
2. Go to `Settings`.
3. Go to `Domains`.
4. Add the official domain, for example:

```text
castiglione.com.au
www.castiglione.com.au
```

5. Follow Vercel's DNS instructions.
6. Wait for DNS verification.
7. Test both the root domain and `www`.

Do not bind the official domain during the preview stage.

## GitHub Safety Checklist

Before pushing:

- `.gitignore` excludes `node_modules/`.
- `.gitignore` excludes `.next/`.
- `.gitignore` excludes `.env.local`.
- No API keys, passwords, tokens, or private keys are committed.
- `pnpm-lock.yaml` is committed.
- `node_modules/` is not committed.

## Non-Engineer Publishing Checklist

1. Open Terminal.
2. Go to the project folder.
3. Run `pnpm install`.
4. Run `pnpm typecheck`.
5. Run `pnpm build`.
6. Run `pnpm dev`.
7. Open `http://localhost:3000`.
8. Check the homepage on desktop and phone size.
9. Push the folder to GitHub.
10. Import the GitHub repository into Vercel.
11. Copy the Vercel Preview URL.
12. Share the Preview URL for review.
13. Wait to connect the official domain until the website is fully approved.
