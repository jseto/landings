import * as React from 'react';
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MdxFrontmatter } from '../../graphql-types';

interface MarkdownBlockProps {
	className?: string;
	frontmatter?: MdxFrontmatter;			// Use from MDX file as {props.frontmatter}
	featuredImage?: string;
	children: string;
}

export const MarkdownBlock: React.FC<MarkdownBlockProps> = ({
	className,
	children,
	frontmatter,
	featuredImage
}: MarkdownBlockProps) => {

	return (
		<div className={`markdown-block ${ className? className : '' }`}>
			<div className="content">
				<MDXRenderer 
					frontmatter={ frontmatter }
					featuredImage={ featuredImage }
				>
					{ children }
				</MDXRenderer>
			</div>
		</div>
	);
};
