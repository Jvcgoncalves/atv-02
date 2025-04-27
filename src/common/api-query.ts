import axios from "axios";
import GitHubUser from "./i-user";
import { GitHubRepository } from "./i-repo";

const baseUrl = "https://api.github.com/users/";
const reposUrl = "https://api.github.com/users/username/repos"

export default async function searchForUser(username: string) {
  const url = baseUrl + username;
  const respositoriesUrl = reposUrl;

  try {
    const userResponse = await axios.get<GitHubUser>(url);
    const user = userResponse.data;

    if (user) {
      const repositoriesResponse = await axios.get<GitHubRepository[]>(respositoriesUrl.replace("username", username));
      const repositories = repositoriesResponse.data;
      
      return { user, repositories };
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}