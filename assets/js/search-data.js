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
          description: "A growing collection of your cool projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/site-v2/projects/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "Edit the `_data/repositories.yml` and change the `github_users` and `github_repos` lists to include your own GitHub profile and repositories.",
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
          
            window.location.href = "/site-v2/blog/2025/concert/";
          
        },
      },{id: "post-submitted-my-thesis",
        
          title: "Submitted my thesis",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/site-v2/blog/2025/thesis/";
          
        },
      },{id: "post-presented-at-ieee-ism-in-tokyo",
        
          title: "Presented at IEEE ISM in Tokyo",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/site-v2/blog/2024/ism/";
          
        },
      },{id: "post-completed-42-km-porto-marathon",
        
          title: "Completed 42 km. Porto Marathon",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/site-v2/blog/2023/marathon/";
          
        },
      },{id: "post-best-presentation-award-at-epia-2023",
        
          title: "Best presentation award at EPIA 2023",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/site-v2/blog/2023/emotion4midi/";
          
        },
      },{id: "post-tv-interview-on-sic-notícias",
        
          title: "TV Interview on SIC Notícias",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/site-v2/blog/2022/sic/";
          
        },
      },{id: "post-newspaper-interview-in-quot-observador-quot",
        
          title: "Newspaper Interview in &quot;Observador&quot;",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/site-v2/blog/2022/observador/";
          
        },
      },{id: "post-lecture-video-deep-learning-for-music-processing",
        
          title: "Lecture video - Deep learning for music processing",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/site-v2/blog/2021/lecture/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/site-v2/books/the_godfather/";
            },},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/site-v2/projects/1_project/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/site-v2/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/site-v2/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/site-v2/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/site-v2/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/site-v2/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/site-v2/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/site-v2/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/site-v2/projects/9_project/";
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
