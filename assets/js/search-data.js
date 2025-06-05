// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/site-v2/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/site-v2/blog/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/site-v2/publications/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/site-v2/projects/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/site-v2/repositories/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "This is a description of the page. You can modify it in &#39;_pages/cv.md&#39;. You can also change or remove the top pdf download button.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/site-v2/cv/";
          },
        },{id: "nav-teaching",
          title: "teaching",
          description: "Materials for courses you taught. Replace this text with your description.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/site-v2/teaching/";
          },
        },{id: "nav-people",
          title: "people",
          description: "members of the lab or group",
          section: "Navigation",
          handler: () => {
            window.location.href = "/site-v2/people/";
          },
        },{id: "dropdown-bookshelf",
              title: "bookshelf",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/site-v2/books/";
              },
            },{id: "dropdown-blog",
              title: "blog",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/site-v2/blog/";
              },
            },{id: "post-upcoming-concert-on-17-may",
        
          title: "Upcoming concert on 17 May",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/site-v2/blog/concert/";
          
        },
      },{id: "post-submitted-my-thesis",
        
          title: "Submitted my thesis",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/site-v2/blog/thesis/";
          
        },
      },{id: "post-presented-at-ieee-ism-in-tokyo",
        
          title: "Presented at IEEE ISM in Tokyo",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/site-v2/blog/ism/";
          
        },
      },{id: "post-completed-42-km-porto-marathon",
        
          title: "Completed 42 km. Porto Marathon",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/site-v2/blog/marathon/";
          
        },
      },{id: "post-best-presentation-award-at-epia-2023",
        
          title: "Best presentation award at EPIA 2023",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/site-v2/blog/emotion4midi/";
          
        },
      },{id: "post-tv-interview-on-sic-notícias",
        
          title: "TV Interview on SIC Notícias",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/site-v2/blog/sic/";
          
        },
      },{id: "post-newspaper-interview-in-quot-observador-quot",
        
          title: "Newspaper Interview in &quot;Observador&quot;",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/site-v2/blog/observador/";
          
        },
      },{id: "post-lecture-video-deep-learning-for-music-processing",
        
          title: "Lecture video - Deep learning for music processing",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/site-v2/blog/lecture/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/site-v2/books/the_godfather/";
            },},{id: "projects-audio-bandwidth-extension",
          title: 'Audio bandwidth extension',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/site-v2/projects/bwe/";
            },},{id: "projects-emotion-based-symbolic-music-generation",
          title: 'Emotion-based Symbolic Music Generation',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/site-v2/projects/emotion";
            },},{id: "projects-learned-frame-prediction-for-video-codecs",
          title: 'Learned frame prediction for video codecs',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/site-v2/projects/lfp/";
            },},{id: "projects-video-based-symbolic-music-generation",
          title: 'Video-based Symbolic Music Generation',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/site-v2/projects/soundtrack/";
            },},{id: "projects-multimodal-video-classification",
          title: 'Multimodal video classification',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/site-v2/vemoclap";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6E%61%6D%65 %44%4F%54 %73%75%72%6E%61%6D%65 %41%54 %69%6E%65%73%63%74%65%63 %44%4F%54 %70%74", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/serkansulun", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=FehjYXEAAAAJ", "_blank");
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
