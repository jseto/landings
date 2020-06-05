import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { ImportMarkdownQuery } from '../../graphql-types';
import { MarkdownBlock } from './markdown-block';

interface ImportMarkdownProps {
	className?: string;
	slug: string;
}

export const ImportMarkdown = ({ className, slug }: ImportMarkdownProps)=> {

	const files: ImportMarkdownQuery = useStaticQuery(graphql`
		query ImportMarkdown {
			allMdx {
				nodes {
					body
					fields {
						slug
					}
				}
			}
		}
	`)

	const md = files.allMdx.nodes.find( item => item.fields.slug.includes( slug ) )

	return (
		<MarkdownBlock className={ className || slug }>
			{ md.body }
		</MarkdownBlock>
	)
}