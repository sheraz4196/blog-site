import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Seo({ data }) {
	return (
		<HelmetProvider>
			<Helmet title={data?.title || "Stefan Blog"}>
				<meta
					name="description"
					content={data?.description}
				/>
				<meta
					property="og:title"
					content={data?.title}
				/>
				<meta
					property="og:description"
					content={data?.description}
				/>
				{data?.keywords && (
					<meta
						name="keywords"
						content={data?.keywords}
					/>
				)}
				{data?.image?.fields?.file?.url && (
					<meta
						property="og:image"
						content={data?.image?.fields?.file?.url}
					/>
				)}
				<meta
					property="og:url"
					content="https://stefan-blog.vercel.app"
				/>
				<meta
					name="robots"
					content="index, follow"
				/>
			</Helmet>
		</HelmetProvider>
	);
}
