---
layout: page
title: Learned frame prediction for video codecs
# description: with background image
img: assets/img/proj/lfp.jpg
importance: 4
category: work
related_publications: true
permalink: /projects/lfp/
---

Standard video codecs use a "motion compensation" module to predict the next frame. This way, rather than encoding video frames in their entirety, they only encode motion vectors that map blocks from the previous frame, alongside the residual image which is rather sparse.

In this project, I replace the motion compensation module with a deep neural network (DNN), eliminating the use of motion vectors. This DNN can predict the entire frame in a single forward-pass, without relying on blocks or motion prediction. This approach outperforms the well-established x264 video codec.

I furthermore show that by incorporating adversarial learning, it is possible to obtain more realistic video prediction results, at the cost of higher PSNR. The [code](https://github.com/serkansulun/learned-frame-prediction) and the papers are available {% cite frame_prediction %}, {% cite frame_prediction_thesis %}. Supplementary material is presented here:

&nbsp;

## Supplementary material

Here are the qualitative results for our learned video prediction models. In particular, we compare the performance of two models, one trained with L2 loss (L2) and the other with adversarial loss and L2 loss combined (GAN). All results belong to the 9th frames of each video. The slideshow provides an easy way to compare images, enabling navigation using the arrow keys of the keyboard. Below the slideshow, ground-truth and prediction images are available at their original size.

<br/><br/>

<center>
<iframe src="https://docs.google.com/presentation/d/1AwFJKswYCFXy56EYMctAicZ27Cg98BgaVwnYLSsbTIs/embed?start=false&loop=false&delayms=60000" frameborder="0" width="960" height="540" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
</center>
