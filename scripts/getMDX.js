const generate = require("./generateMDX.js");
const fs = require("fs");

console.log('Generating MDX')

getMDX();

async function getMDX() {
    const releases = await fetch('https://api.github.com/repos/Discord-Dashboard/Soft-UI/releases', {
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}}`
        }
    }).then((res) => res.json());

    console.log(releases)

    const mdxGenerated = releases.map((release) => {
        return {
            title: release.name,
            date: new Date(release.published_at),
            description: release.body,
            body: release.body,
            author: release.author.login, // Make sure to define 'author' variable with appropriate value
            contributors: [],
            tags: [],
            slug: release.name,
            image: '',
        };
    });

    const mdx = generate(mdxGenerated);

    fs.writeFileSync('src/pages/index.mdx', mdx);

}