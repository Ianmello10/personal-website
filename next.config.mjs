/** @type {import('next').NextConfig} */
import createMDX from '@next/mdx'
import createNextIntlPlugin from 'next-intl/plugin';
import rehypePrettyCode from 'rehype-pretty-code';
import { Theme } from 'shiki/textmate';
import  rehypeHighlight from 'rehype-highlight';

const withNextIntl = createNextIntlPlugin()
const theme = Theme.fromThemeName('dracula');

const options = {
    theme: 'dracula', // Escolha um tema compatível com Shiki
    keepBackground: true, // Caso queira manter o background do tema
    onVisitLine(node) {
      // Adiciona <span> vazio para linhas sem conteúdo
      if (node.children.length === 0) {
        node.children.push({ type: 'text', value: ' ' });
      }
    },
    onVisitHighlightedLine(node) {
      // Adiciona uma classe especial para linhas destacadas
      node.properties.className = ['highlighted'];
    },
    onVisitHighlightedWord(node) {
      // Adiciona uma classe especial para palavras destacadas
      node.properties.className = ['word-highlight'];
    },
  };

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  extension: /\.mdx?$/,
  options:{

    remarkPlugins: [],
    rehypePlugins: [
        [
          rehypePrettyCode,
          options,
        ],
      ],  }
})
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    transpilePackages: ['next-mdx-remote'],

    async redirects() {
        return [
            {
                source: '/pt/blog',
                destination: '/en/blog',
                permanent: true,
            },

        ]
    },

    eslint: {
        ignoreDuringBuilds: true,
    },

    reactStrictMode: true,
    images: {
        domains: ['unsplash.com', 'plus.unsplash.com', 'images.unsplash.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'https://plus.unsplash.com/',
                port: '',
                // pathname: '/account123/**',
            },
        ],
    }

};

export default withNextIntl(withMDX(nextConfig));
