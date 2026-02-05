---
layout: page
title: Video-based Symbolic Music Generation
# description: with background image
img: assets/img/proj/soundtrack.png
importance: 1
category: work
related_publications: true
---

As more people publish video content on platforms such as YouTube, incorporating engaging soundtracks has become an important challenge. Current alternatives have significant drawbacks. Using royalty-free music requires time and effort to find a suitable piece, and many creators unknowingly use the same tracks, limiting novelty. Composing a soundtrack requires musical expertise, while hiring professionals is costly. Purchasing a suitable piece of music also incurs expenses and requires the effort to find an appropriate track.

This project addresses this issue. I develop a two-stage model, employing deep neural networks (DNNs), to analyze a given video, and then to automatically compose a suitable soundtrack. The soundtracks fits the video in two aspects. Both music and video conduct similar emotions, and they both have concurrent temporal boundaries.

In the video analysis stage, the model classifies the emotions of the video. For more details, check out my [video project]({{ "/projects/video/" | relative_url }}). The scene boundaries of the video are also extracted.

In my previous project, I developed an [emotion-based symbolic music generator]({{ "/projects/emotion/" | relative_url }}). The emotions extracted from the video drive music generator.

Secondly, the music model generates musical boundaries in the form of long chords, near the video scene boundaries, while maintaining the rhythm and harmony. This is made possible by a novel mechanism that incorporates "boundary offsets" into the transformer architecture, enabling the model to anticipate upcoming boundaries.

The paper is available on [ArXiv](https://arxiv.org/abs/2502.10154) {% cite soundtrack %}. The source code is available on [Github](https://github.com/serkansulun/emsync). An online demo is available on [Colab](https://colab.research.google.com/drive/1hq6WmZztJk-yKp0UX1UTon8rJ3xC-bV6). Output samples with comparison to the state of the art is also [available](https://serkansulun.com/emsync).