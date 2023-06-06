module.exports = function generate(items) {
    let mdx = `import { SparkleIcon } from '@/components/SparkleIcon'
import { generateRssFeed } from '@/lib/generateRssFeed'
    
export async function getStaticProps() {
    if (process.env.NODE_ENV === 'production') {
        await generateRssFeed()
    }
    return { props: {} }
}
    
    `
    // ![](@/images/commit-suggestions.png)

    items.forEach((item) => {
        const {
            title,
            date,
            description,
            body,
            author,
            contributors,
            tags,
            slug,
            image
        } = item
        mdx += `---

## ${title} {{ date: '${date}' }}

${description.replace("What's changed", "Improvements")}


`;
    })
    return mdx
}
