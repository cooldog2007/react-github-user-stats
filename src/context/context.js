import React, { useState, useEffect, useContext, useRef } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";
import { queryAllByAltText } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
const rootUrl = "https://api.github.com";

const GlobalContext = React.createContext();

export const AppContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(null);
  const [followers, setFollowers] = useState(mockFollowers);
  const [languages, setLanguages] = useState(null);
  const [stars, setStars] = useState(null);
  const [starsPerLanguage, setStarsPerLanguage] = useState(null);
  const [forks, setForks] = useState(null);
  const [badRequest, setBadRequest] = useState(false);
  const [searchesLeft, setSearchesLeft] = useState(60);

  const fetchNewUser = async () => {
    setLoading(true);
    try {
      await axios.get(`${rootUrl}/users/${query}`).then((res) => {
        setGithubUser(res.data);
      });

      setLoading(false);
    } catch (error) {
      if (error.code === "ERR_BAD_REQUEST") {
        console.log("hii");
        setBadRequest(true);
      }
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!badRequest) return;
    const timer = setTimeout(() => {
      setBadRequest((prev) => !prev);
    }, 3000);
    return () => clearTimeout(timer);
  }, [badRequest]);

  const fetchRepos = async () => {
    setLoading(true);
    try {
      await axios
        .get(`${rootUrl}/users/${githubUser.login}/repos`)
        .then((res) => {
          setRepos(res.data);
          setLoading(false);
        });
      await axios.get(`${rootUrl}/rate_limit`).then((res) => {
        setSearchesLeft(res.data.rate.remaining);
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const fetchFollowers = async () => {
    setLoading(true);
    try {
      const i = await axios
        .get(`${rootUrl}/users/${githubUser.login}/followers`)
        .then((res) => {
          return res.data;
        });

      const tempFollowers = i.map((item) => {
        return {
          login: item.login,
          url: item.html_url,
          avatar: item.avatar_url,
        };
      });
      setFollowers(tempFollowers);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchLanguage = async () => {
    setLoading(true);
    //get urls
    if (!repos) return;

    // stars to add to langObjArr
    const reposStars = [];
    const languages_urls = repos.map((repo) => {
      reposStars.push(repo.stargazers_count);
      return repo.languages_url;
    });

    const langObjArr = [];
    //make an array of objects
    for (const url of languages_urls) {
      console.log(languages_urls);
      const res = await axios.get(url);
      const langObj = res.data;

      if (Object.keys(langObj).length !== 0) langObjArr.push(langObj);
    }

    // const res = await axios.get(languages_urls[0]);
    // const langObj = res.data;

    // get them fields
    const languageKeys = langObjArr.reduce((acc, item) => {
      for (const field of Object.keys(item)) {
        if (acc.includes(field)) return [...acc];
        return [...acc, field];
      }
    }, []);
    // console.log(languageKeys);
    // build accumulator
    const langAcc = languageKeys.reduce((acc, item) => {
      return {
        ...acc,
        [item]: 0,
      };
    }, {});

    // double loop w rizz
    for (const item of langObjArr) {
      for (const [key, value] of Object.entries(item)) {
        langAcc[key] += value;
      }
    }

    // prepping for chart use
    const final = Object.entries(langAcc).map((entry) => {
      const [key, value] = entry;
      return {
        label: key,
        value,
      };
    });

    // another acc + clean it up
    const starsPerLangAcc = { ...langAcc };
    for (const [field, _] of Object.entries(starsPerLangAcc)) {
      starsPerLangAcc[field] = 0;
    }

    const langsStars = langObjArr.map((obj, i) => {
      return {
        ...obj,
        stars: reposStars[i],
      };
    });

    for (const langObj of langsStars) {
      if (!langObj.stars) continue;
      const keys = Object.keys(langObj);
      const stars = langObj.stars;

      for (const key of keys) {
        if (key === "stars") continue;
        starsPerLangAcc[key] += stars;
      }
    }

    const starsPerLanguage = Object.entries(starsPerLangAcc).map((entry) => {
      const [key, value] = entry;
      return {
        label: key,
        value,
      };
    });
    setStarsPerLanguage(starsPerLanguage);
    setLanguages(final);
    setLoading(false);
  };

  const getStars = () => {
    if (!repos) return;
    const starsTemp = repos.map((repo) => {
      return {
        name: repo.name,
        stars: repo.stargazers_count,
      };
    });

    const sortedTemp = starsTemp.sort((a, b) => {
      if (a.stars >= b.stars) {
        return -1;
      } else return 1;
    });
    const starz = sortedTemp.slice(0, 5).map((entry) => {
      const { name, stars } = entry;
      return {
        label: name,
        value: stars,
      };
    });
    setStars(starz);
    // setStars();
  };

  const getForks = () => {
    if (!repos) return;
    const forksTemp = repos.map((repo) => {
      return {
        name: repo.name,
        forks: repo.forks_count,
      };
    });

    const sortedTemp = forksTemp.sort((a, b) => {
      if (a.forks >= b.forks) {
        return -1;
      } else return 1;
    });
    const forks = sortedTemp.slice(0, 5).map((entry) => {
      const { name, forks } = entry;
      return {
        label: name,
        value: forks,
      };
    });

    setForks(forks);
    // setStars();
  };

  useEffect(() => {
    if (loading) return;
    fetchRepos();
  }, [githubUser]);

  useEffect(() => {
    if (loading) return;
    fetchLanguage();
    fetchFollowers();
    getStars();
    getForks();
  }, [repos]);

  return (
    <GlobalContext.Provider
      value={{
        searchesLeft,
        badRequest,
        fetchNewUser,
        query,
        setQuery,
        followers,
        languages,
        githubUser,
        repos,
        followers,
        loading,
        stars,
        forks,
        starsPerLanguage,
        setGithubUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
