import "./tailwind.scss"
import "./taildwind.import.css"
import { useState } from "react";
import searchForUser from "../../common/api-query";
import { GitHubRepository } from "../../common/i-repo";
import GitHubUser from "../../common/i-user";

export default function Tailwind() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repositories, setRepositories] = useState<GitHubRepository[] | null>(null);
  const [requested, setRequested] = useState(false);
  
  const getUser = async () => {
    const response = await searchForUser(username);

    if (!response) {
      setUser(null);
    } else {
      setUser(response.user);
      setRepositories(response.repositories);
    }

    setRequested(true);
  }
  
  function showUser() {
    if (!requested) {
      return null
    } else {
      return !user ? <p className="text-center text-base">Usuário não encontrado</p> : (
        <div className="p-3 shadow-md shadow-neutral-400 bg-neutral-100 mt-5">
          <img src={user.avatar_url} alt="userImage" className="bg-cover mx-auto max-w-40 rounded-full"/>
          <p className="mt-0.5">Nome: { user.name }</p>
          <p className="mt-0.5">Bio: { user.bio }</p>
          { 
            user.blog ? <a href={ user.blog } target="_blank" className="underline underline-offset-2 text-blue-700 text-base">Site/portifólio
            </a> : null
          }

          <p className="mt-0.5">Repositórios: { repositories?.length }</p>
          <p className="mt-0.5">Seguidores: { user?.followers }</p>
          <p className="mt-0.5">Seguindo: { user?.following }</p>

          <a href={ user.html_url } className="bg-blue-500 block w-max text-white px-4 py-2 cursor-pointer shadow rounded-md mx-auto mt-3" target="_blank">Visitar perfil</a>
        </div>
      )
    }
  }
  
  return (
    <div className="h-dvh w-full grid place-content-center bg-gray-100">
      <div className="max-w-96 w-full">
        <div className="flex flex-col">
          <label htmlFor="user">Nome de usuário</label>
          <input type="text" 
                 id="user"
                 className="input bg-gray-400 px-2 py-2.5 rounded-md focus:outline-1 focus:outline-purple-800  shadow-neutral-900"
                 value={username}
                 onChange={event => setUsername(event.target?.value?.trim() ?? "")} />

          <button onClick={() => getUser()}
                  className="bg-blue-500 text-white w-min px-4 py-2 cursor-pointer shadow rounded-md mx-auto mt-3">

            Buscar
          </button>                 
        </div>

        { showUser() }
      </div>
    </div>
  )
}