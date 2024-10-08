import { useContext, useLayoutEffect, useState } from "react"; // React hooks
import { AppContext } from "../../providers/appContext"; // Context provider
import { useMutation, useQuery } from "@apollo/client"; // Apollo Client hooks
import { GET_SAVED_MOVIES, SAVE_MOVIE, REMOVE_MOVIE } from "./queries"; // GraphQL queries

export const useSavedMovies = () => {
  const { state } = useContext(AppContext);
  const [savedMoviesLoading, setSavedMoviesLoading] = useState(false);
  const [saveMovie] = useMutation(SAVE_MOVIE);
  const { loading, error, data, refetch } = useQuery(GET_SAVED_MOVIES, {
    variables: { page: 1, all: true },
    // skip: true, // Изначально пропускаем запрос
    // onError: async error => {
    //   console.log(`Error loading`, error);
    // },
  });
  const [removeMovie] = useMutation(REMOVE_MOVIE);
  const [savedMovies, setSavedMovies] = useState([]);

  useLayoutEffect(() => {
    if (state.user) {
      // Если пользователь существует, запускаем refetch для получения данных
      refetch();
    }
  }, [state.user, refetch]);

  useLayoutEffect(() => {
    if (data && data?.getSavedMovies) {
      setSavedMovies(data.getSavedMovies.results); // Устанавливаем фильмы, когда есть данные
    }
  }, [data]);

  const addMovieToSaved = async movie => {
    // console.log(`movie!!!!`, movie);
    setSavedMoviesLoading(true);
    const isNewMovie = !savedMovies.find(({ id }) => id === movie.id);

    if (isNewMovie) {
      setSavedMovies(prevMovies => {
        const updatedMovies = [...prevMovies, { ...movie, movieId: movie.id }];
        return updatedMovies;
      });

      try {
        const movieObj = {
          id: movie.id,
          title: movie.title,
          releaseDate: movie.releaseDate,
          image: movie.image || "",
          genres: movie?.genres?.map(m => m.id) || [],
          adult: movie.adult || false,
          backdropPath: movie.backdropPath || "",
          originalLanguage: movie.originalLanguage || "",
          originalTitle: movie.originalTitle || "",
          overview: movie.overview || "",
          popularity: movie.popularity || 0,
          video: movie.video || false,
          voteAverage: movie.voteAverage || 0,
          voteCount: movie.voteCount || 0,
        };

        await saveMovie({
          variables: {
            movie: movieObj,
          },
        });

        return true;
      } catch (error) {
        console.error("Error saving movie:", error);
        return false;
      } finally {
        setSavedMoviesLoading(false);
      }
    }
  };

  const removeMovieFromSaved = async movie => {
    // console.log(`movie---`, movie);
    setSavedMoviesLoading(true);
    try {
      await removeMovie({
        variables: {
          id: movie.id,
        },
      });
      setSavedMovies(prevMovies => {
        const updatedMovies = prevMovies.filter(m => {
          const movieIdCheck = m.movieId
            ? String(m.movieId) !== String(movie.id)
            : true;
          return String(m.id) !== String(movie.id) && movieIdCheck;
        });

        return updatedMovies;
      });
      return true;
    } catch (error) {
      console.error("Error removing movie:", error);
      return false;
    } finally {
      setSavedMoviesLoading(false);
    }
  };

  return {
    savedMovies,
    addMovieToSaved,
    removeMovieFromSaved,
    savedMoviesLoading,
    loading,
    error,
  };
};
