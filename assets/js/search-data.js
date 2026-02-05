// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-teaching",
          title: "teaching",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "post-video-based-music-generation-and-thesis-defense",
        
          title: "Video-based music generation and thesis defense",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/thesis/";
          
        },
      },{id: "post-upcoming-concert-on-17-may",
        
          title: "Upcoming concert on 17 May",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/concert/";
          
        },
      },{id: "post-presented-at-ieee-ism-in-tokyo",
        
          title: "Presented at IEEE ISM in Tokyo",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/ism/";
          
        },
      },{id: "post-completed-42-km-porto-marathon",
        
          title: "Completed 42 km. Porto Marathon",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/marathon/";
          
        },
      },{id: "post-best-presentation-award-at-epia-2023",
        
          title: "Best presentation award at EPIA 2023",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/emotion4midi/";
          
        },
      },{id: "post-tv-interview-on-sic-notícias",
        
          title: "TV Interview on SIC Notícias",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/sic/";
          
        },
      },{id: "post-newspaper-interview-in-quot-observador-quot",
        
          title: "Newspaper Interview in &quot;Observador&quot;",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/observador/";
          
        },
      },{id: "post-lecture-video-deep-learning-for-music-processing",
        
          title: "Lecture video - Deep learning for music processing",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/lecture/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "projects-audio-bandwidth-extension",
          title: 'Audio bandwidth extension',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/bwe";
            },},{id: "projects-emotion-based-symbolic-music-generation",
          title: 'Emotion-based Symbolic Music Generation',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/midi";
            },},{id: "projects-learned-frame-prediction-for-video-codecs",
          title: 'Learned frame prediction for video codecs',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/lfp/";
            },},{id: "projects-video-based-symbolic-music-generation",
          title: 'Video-based Symbolic Music Generation',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/soundtrack/";
            },},{id: "projects-multimodal-video-classification",
          title: 'Multimodal video classification',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/vemoclap";
            },},{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=FehjYXEAAAAJ", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/serkansulun", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:(%6E%61%6D%65)(%73%75%72%6E%61%6D%65 %77%69%74%68%6F%75%74 %76%6F%77%65%6C%73)(%41%54)(%67%6D%61%69%6C)(%44%4F%54)(%63%6F%6D)", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
