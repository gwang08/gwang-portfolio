export async function getProjectsDataBySlug(slug: string): Promise<ProjectItem | undefined> {
	const projects = await getProjects();
	return projects.find((p) => p.slug === slug);
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | undefined> {
	const projects = await getProjects();
	return projects.find((p) => p.slug === slug);
}

import { ProjectItem } from "@/common/types/projects";

export async function getProjects(): Promise<ProjectItem[]> {
	return [
		   {
			   id: 1,
			   title: "TicketResell Web",
			   slug: "ticketresell",
			   description: "",
			   image: "/images/projects/ticketresell.png",
			   stacks: ["Next.js", "MongoDb", "TailwindCSS", "ASP.NET"],
			   is_show: true,
			   is_featured: false,
			   link_demo: null,
			   link_github: "https://github.com/gwang08/TicketResell_Web",
			   content: null,
		   },
		   {
			   id: 2,
			   title: "E-commerce Web",
			   slug: "ftech",
			   description: "",
			   image: "/images/projects/ftech.png",
			   stacks: ["HTML", "CSS", "Java", "JSP", "SQL Server"],
			   is_show: true,
			   is_featured: false,
			   link_demo: null,
			   link_github: "https://github.com/gwang08/ecommerce-website",
			   content: null,
		   },
		   {
			   id: 3,
			   title: "GoodMeal AI",
			   slug: "goodmeal",
			   description: "",
			   image: "/images/projects/goodmeal.png",
			   stacks: [
					  "Next.js",
					  "TailwindCSS",
					  "PostgreSQL",
					  "ASP.NET",
					  "Microservices",
			   ],
			   is_show: true,
			   is_featured: true,
			   link_demo: null,
			   link_github: "https://github.com/gwang08/GoodMeal-AI-Food-Recommendation-Web-App",
			   content: null,
		   },
		   {
			   id: 4,
			   title: "GhepXe Website",
			   slug: "ghepxe",
			   description: "",
			   image: "/images/projects/ghepxeweb.png",
			   stacks: ["Next.js", "MongoDb"],
			   is_show: true,
			   is_featured: false,
			   link_demo: null,
			   link_github: "https://github.com/gwang08/ghepxe",
			   content: null,
		   },
		   {
			   id: 5,
			   title: "GhepXe Mobile App",
			   slug: "ghepxemobile",
			   description: "",
			   image: "/images/projects/ghepxemobile.png",
			   stacks: ["React Native", "MongoDb"],
			   is_show: true,
			   is_featured: false,
			   link_demo: "updatesoon",
			   link_github: null,
			   content: null,
		   },
	];
}
