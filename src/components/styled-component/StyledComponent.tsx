import { useState } from "react";
import searchForUser from "../../common/api-query";
import GitHubUser from "../../common/i-user";
import { GitHubRepository } from "../../common/i-repo";
import UserCard from "./styles/UserCardStyles";
import UserImage from "./styles/UserImageStyles";
import BlogLink from "./styles/BlogLinkStyles";
import Container from "./styles/ContainerStyles";
import Wrapper from "./styles/WrapperStyles";
import Label from "./styles/LabelStyles";
import Input from "./styles/InputStyles";
import Button from "./styles/ButtonStyles";
import Link from "./styles/LinkStyles";
import Form from "./styles/FormStyles";

export default function StyledComponentsExample() {
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
  };

  function showUser() {
    if (!requested) {
      return null;
    } else {
      return !user ? (
        <p style={{ textAlign: "center", fontSize: "1rem" }}>Usuário não encontrado</p>
      ) : (
        <UserCard>
          <UserImage src={user.avatar_url} alt="userImage" />
          <p>Nome: {user.name}</p>
          <p>Bio: {user.bio}</p>

          {user.blog && (
            <BlogLink href={user.blog} target="_blank">
              Site/portfólio
            </BlogLink>
          )}

          <p>Repositórios: {repositories?.length}</p>
          <p>Seguidores: {user.followers}</p>
          <p>Seguindo: {user.following}</p>

          <Link href={user.html_url} target="_blank">
            Visitar perfil
          </Link>
        </UserCard>
      );
    }
  }

  return (
    <Container>
      <Wrapper>
        <Form>
          <Label htmlFor="user">Nome de usuário</Label>
          <Input
            type="text"
            id="user"
            value={username}
            onChange={(event) => setUsername(event.target.value.trim() ?? "")}
          />
          <Button onClick={getUser}>Buscar</Button>
        </Form>

        {showUser()}
      </Wrapper>
    </Container>
  );
}
