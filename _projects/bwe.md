---
layout: page
title: Audio bandwidth extension
# description: a project with a background image and giscus comments
img: assets/img/proj/bwe.png
importance: 3
category: work
related_publications: true
# giscus_comments: true
---

My paper titled "On Filter Generalization for Music Bandwidth Extension Using Deep Neural Networks" is published on IEEE Journal of Selected Topics in Signal Processing {% cite sulunFilterGeneralizationMusic2020 %}. The supplementary material is presented at the bottom of this page.

The paper is available on [ArXiv](https://arxiv.org/abs/2011.07274v2). The source code is available on [Github](https://github.com/serkansulun/deep-music-enhancer). Our paper can be cited as:

    @article{9257456,
      title={On Filter Generalization for Music Bandwidth Extension Using Deep Neural Networks},
      author={Sulun, Serkan and Davies, Matthew E.P.},
      journal={IEEE Journal of Selected Topics in Signal Processing},
      year={2021},
      volume={15},
      number={1},
      pages={132-142},
      doi={10.1109/JSTSP.2020.3037485}}

## Abstract

In this paper, we address a sub-topic of the broad domain of audio enhancement, namely musical audio bandwidth extension. We formulate the bandwidth extension problem using deep neural networks, where a band-limited signal is provided as input to the network, with the goal of reconstructing a full-bandwidth output. Our main contribution centers on the impact of the choice of low pass filter when training and subsequently testing the network. For two different state of the art deep architectures, ResNet and U-Net, we demonstrate that when the training and testing filters are matched, improvements in signal-to-noise ratio (SNR) of up to 7 dB can be obtained. However, when these filters differ, the improvement falls considerably and under some training conditions results in a lower SNR than the band-limited input. To circumvent this apparent overfitting to filter shape, we propose a data augmentation strategy which utilizes multiple low pass filters during training and leads to improved generalization to unseen filtering conditions at test time.

## Supplementary material

Here are the qualitative results on music bandwidth enhancement using deep neural networks. All samples are obtained using our test set, namely the [DSD100](https://sigsep.github.io/datasets/dsd100.html) test split. The quantitative results including the signal-to-noise ratio (SNR) and mean absolute distance of the VGG embeddings (VGG), with respect to the ground-truth, for all the test songs in their full length, is also [available](/assets/compressed/results_csv.zip).

&nbsp;

<style>
td, th, tr {
  text-align: center;
  vertical-align: middle;
  height: 80px;
  /* width: 10px */
}
</style>

# Secretariat - Over The Top

### Ground-truth

<audio controls preload="none">
  <source src="{{ '/assets/audio/bwe/034_t.wav' | relative_url }}" type="audio/mpeg">
Your browser does not support the audio element.
</audio>

<!-- &nbsp; -->

&nbsp;

### Inputs and outputs

<table style="width:100%">
  <tr>
    <th> </th>
    <th><b> Chebyshev1 - 6th order <br> (seen filter)</b></th> 
    <th><b> Butterworth - 6th order <br> (unseen filter)</b></th>
  </tr>
  <tr>
    <th><b>Input</b></th>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/034_cheby1_x.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/034_butter_x.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
  </tr>
  <tr>
    <td><b>U-Net</b></td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/034_cheby1_y_unet.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/034_butter_y_unet.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
  </tr>
  <tr>
    <td><b>U-Net w/ data <br> augmentation</b></td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/034_cheby1_y_unetda.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/034_butter_y_unetda.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
  </tr>
  <tr>
    <td><b>U-Net w/ batch <br> normalization</b></td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/034_cheby1_y_unetbn.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/034_butter_y_unetbn.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
  </tr>
  <tr>
    <td><b>U-Net w/ <br> dropout</b></td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/034_cheby1_y_unetdo.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/034_butter_y_unetdo.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
  </tr>
  
  <tr>
    <td><b>ResNet</b></td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/034_cheby1_y_resnet.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/034_butter_y_resnet.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
  </tr>
  <tr>
    <td><b>ResNet w/ data <br> augmentation</b></td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/034_cheby1_y_resnetda.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/034_butter_y_resnetda.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
  </tr>
  <tr>
    <td><b>ResNet w/ batch <br> normalization</b></td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/034_cheby1_y_resnetbn.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/034_butter_y_resnetbn.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
  </tr>
  <tr>
    <td><b>ResNet w/ <br> dropout</b></td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/034_cheby1_y_resnetdo.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/034_butter_y_resnetdo.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
  </tr>
</table>

&nbsp;

# Skelpolu - Resurrection

### Ground-truth

<audio controls preload="none">
  <source src="{{ '/assets/audio/bwe/036_t.wav' | relative_url }}" type="audio/mpeg">
Your browser does not support the audio element.
</audio>

&nbsp;

### Inputs and outputs

<table style="width:100%">
  <tr>
    <th> </th>
    <th><b>Chebyshev1-6 <br> (seen filter)</b></th> 
    <th><b>Butterworth-6 <br> (unseen filter)</b></th>
  </tr>
  <tr>
    <th><b>Input</b></th>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/036_cheby1_x.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/036_butter_x.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
  </tr>
  <tr>
    <td><b>U-Net</b></td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/036_cheby1_y_unet.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/036_butter_y_unet.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
  </tr>
  <tr>
    <td><b>U-Net w/ data <br> augmentation</b></td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/036_cheby1_y_unetda.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/036_butter_y_unetda.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
  </tr>
  <tr>
    <td><b>U-Net w/ batch <br> normalization</b></td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/036_cheby1_y_unetbn.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/036_butter_y_unetbn.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
  </tr>
  <tr>
    <td><b>U-Net w/ <br> dropout</b></td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/036_cheby1_y_unetdo.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/036_butter_y_unetdo.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
  </tr>
  
  <tr>
    <td><b>ResNet</b></td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/036_cheby1_y_resnet.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/036_butter_y_resnet.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
  </tr>
  <tr>
    <td><b>ResNet w/ data <br> augmentation</b></td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/036_cheby1_y_resnetda.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/036_butter_y_resnetda.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
  </tr>
  <tr>
    <td><b>ResNet w/ batch <br> normalization</b></td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/036_cheby1_y_resnetbn.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/036_butter_y_resnetbn.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
  </tr>
  <tr>
    <td><b>ResNet w/ <br> dropout</b></td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/036_cheby1_y_resnetdo.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/036_butter_y_resnetdo.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
  </tr>
</table>

&nbsp;

# M.E.R.C. - Music Knockout

### Ground-truth

<audio controls preload="none">
  <source src="{{ '/assets/audio/bwe/027_t.wav' | relative_url }}" type="audio/mpeg">
Your browser does not support the audio element.
</audio>

&nbsp;

### Inputs and outputs

<table style="width:100%">
  <tr>
    <th> </th>
    <th><b>Chebyshev1-6 <br> (seen filter)</b></th> 
    <th><b>Butterworth-6 <br> (unseen filter)</b></th>
  </tr>
  <tr>
    <th><b>Input</b></th>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/027_cheby1_x.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/027_butter_x.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
  </tr>
  <tr>
    <td><b>U-Net</b></td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/027_cheby1_y_unet.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/027_butter_y_unet.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
  </tr>
  <tr>
    <td><b>U-Net w/ data <br> augmentation</b></td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/027_cheby1_y_unetda.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/027_butter_y_unetda.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
  </tr>
  <tr>
    <td><b>U-Net w/ batch <br> normalization</b></td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/027_cheby1_y_unetbn.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/027_butter_y_unetbn.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
  </tr>
  <tr>
    <td><b>U-Net w/ <br> dropout</b></td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/027_cheby1_y_unetdo.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/027_butter_y_unetdo.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
  </tr>
  
  <tr>
    <td><b>ResNet</b></td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/027_cheby1_y_resnet.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/027_butter_y_resnet.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
  </tr>
  <tr>
    <td><b>ResNet w/ data <br> augmentation</b></td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/027_cheby1_y_resnetda.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/027_butter_y_resnetda.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
  </tr>
  <tr>
    <td><b>ResNet w/ batch <br> normalization</b></td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/027_cheby1_y_resnetbn.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/027_butter_y_resnetbn.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
  </tr>
  <tr>
    <td><b>ResNet w/ <br> dropout</b></td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/027_cheby1_y_resnetdo.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
    <td>
      <audio controls preload="none">
        <source src="{{ '/assets/audio/bwe/027_butter_y_resnetdo.wav' | relative_url }}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
    </td>
  </tr>
</table>

&nbsp;
