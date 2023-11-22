export interface Project {
    name: string,
    image: string,
    url: string,
    gitName: string,
    tags: string[]
};

export let projects: Project[] = [
    {
        name: "IHK-KanAzubi",
        image: "KanAzubi.jpg",
        url: "https://github.com/tonikozarev/IHK-KanAzubi",
        gitName: "tonikozarev/IHK-KanAzubi",
        tags: ["Android"]
    },
    {
        name: "IHK-EveMan",
        image: "EveMan.jpg",
        url: "https://github.com/tonikozarev/IHK-EveMan",
        gitName: "tonikozarev/IHK-EveMan",
        tags: ["Android"]
    },
    {
        name: "AR Path Planning",
        image: "AR-Path-Planning.jpg",
        url: "https://github.com/tonikozarev/AR-Path-Planning",
        gitName: "tonikozarev/AR-Path-Planning",
        tags: ["AR"]
    },
    {
        name: "Website in GitHub",
        image: "Website-GitHub.jpg",
        url: "https://github.com/tonikozarev/Website-GitHub",
        gitName: "tonikozarev/Website-GitHub",
        tags: ["Web"]
    }
]