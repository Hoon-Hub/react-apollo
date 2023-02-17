import { gql, useApolloClient, useQuery } from "@apollo/client";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Image = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
`;

const LikeButton = styled.button`
  padding: 8px;
  background: inherit;
  border: none;
  cursor: pointer;
  color: white;
  border-radius: 5px;
  &:hover{
    background-color: white;
    color: #d754ab;
  }
`

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
      medium_cover_image
      rating
      isLiked @client
    }
  }
`;

export default function Movie() {
  const [updateRating, setUpdateRating] = useState(false)
  const { id } = useParams();
  const { data, loading, client:{cache} } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });
  const onClickHandler = () => {
    cache.writeFragment({
      id: `Movie:${id}`,
      fragment: gql`
        fragment MovieFragment on Movie {
          isLiked
        }
      `,
      data: {
        isLiked: !data.movie.isLiked,
      }
    })
  }
  const updateRate = () => {
    cache.writeFragment({
      id: `Movie:${id}`,
      fragment: gql`
        fragment MovieFragment on Movie {
          rating
        }
      `,
      data: {
        rating: 0
      }
    })
    setUpdateRating(false)
  }
  return (
    <Container>
      <Column>
        <Title>{loading ? "Loading..." : `${data.movie?.title}`}</Title>
        <Subtitle onClick={() => setUpdateRating(!updateRating)}>
          {updateRating === false ? `⭐️ ${data?.movie?.rating}` : (
            <div onClick={(e)=>e.stopPropagation()}>
            <input type="number" autoFocus max={10} min={0} value={data?.movie?.rating} />
            &nbsp;
            <LikeButton type="button" onClick={updateRate}>MyScore</LikeButton>
            </div>
          )}
        </Subtitle>
        <LikeButton type="button" onClick={onClickHandler}>{data?.movie?.isLiked ? "unLike😥" : "Like😍"}</LikeButton>
      </Column>
      <Image bg={data?.movie?.medium_cover_image} />
    </Container>
  );
}