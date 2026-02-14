# Image Optimization Guide

## Overview
This guide covers different strategies for optimizing product images in the Annise Herbal backend.

---

## Option 1: Manual Optimization (Simplest)

### Tools
- **Online:** TinyPNG, Squoosh.app, Compressor.io
- **Desktop:** ImageOptim (Mac), RIOT (Windows)
- **Batch:** Sharp CLI, ImageMagick

### Process
1. Compress images before uploading to Firebase Storage
2. Aim for <200KB per image
3. Use JPEG for photos, PNG for graphics with transparency

**Pros:** Simple, no server code needed  
**Cons:** Manual step, inconsistent results

---

## Option 2: Automatic with Sharp (Recommended)

### Installation
```bash
cd server
npm install sharp
npm install --save-dev @types/sharp