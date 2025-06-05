---
layout: page
title: Multimodal video classification
# description: a project that redirects to another website
img: assets/img/proj/video.png
# redirect: https://unsplash.com
importance: 2
category: work
related_publications: true
permalink: /vemoclap
---

While many existing video classification datasets are specialized, focusing on areas such as human actions or facial expressions, my research targets the classification of **arbitrary** videos. I leverage the multi-modal nature of these videos, utilizing information from video frames, audio, and text.

There is a growing trend of designing overly complex architectures for marginal improvements on specific benchmarks. In contrast, I advocate for reusing pretrained networks, which reduces training time and energy costs while building on the strengths of these models.

Videos are inherently complex, containing objects, scenes, sounds, speech, music, and text. Designing a single network capable of capturing all this information is impractical. Instead, I use pretrained models for tasks such as image captioning, facial expression recognition, automatic speech recognition, audio event classification, optical character recognition, and text encoding. I then train compact yet sophisticated neural networks to fuse these features, while capturing both inter- and intra-modal dependencies.

As a result, I achieve state-of-the-art performance on prominent video benchmarks such as MovieNet and Ekman-6. My main findings are published in the Q1 journal _Expert Systems with Applications_ {% cite trailer %}. Additionally, I developed an [online demo](https://serkansulun.com/app) on Google Colab for video emotion classification, which I [presented] at IEEE's 2024 International Symposium on Multimedia {% cite vemoclap %}. To the best of my knowledge, this is the only existing online application for video emotion classification. Furthermore, despite extensive searches, I have been unable to find **any** open-source pretrained models for this task.

I also make the extracted pretrained features for the Ekman6 and VideoEmotion8 datasets on Zenodo. I additionally include a ekman6_blacklist.txt file, listing the videos which I found are wrongly labeled.

[https://zenodo.org/records/13624583](https://zenodo.org/records/13624583)
