const Profile = require('../model/profile.model');
const Post = require('../model/post.model');
const User = require('../model/user.model');
const axios = require('axios');
/**
 *Contains Profile Controller
 *
 * @class ProfileController
 */
class ProfileController {
  /* eslint camelcase: 0 */

  /**
   * Create/Update profile profile.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @memberof ProfileController
   * @returns {JSON} - A JSON success response.
   */
  static async createProfile(req, res) {
    const {
      company,
      website,
      location,
      bio,
      githubusername,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram,
      status,
      skills,
    } = req.body;

    try {
      let profile = await Profile.findOne({ user: req.user });
      if (!profile) {
        profile = {};
        if (company) profile.company = company;
        if (website) profile.website = website;
        if (location) profile.location = location;
        if (bio) profile.bio = bio;
        if (githubusername) profile.githubusername = githubusername;
        if (status) profile.status = status;
        if (skills)
          profile.skills = skills.split(',').map((skill) => skill.trim());
        profile.user = req.user;

        profile.social = {};
        if (youtube) profile.social.youtube = youtube;
        if (twitter) profile.social.twitter = twitter;
        if (facebook) profile.social.facebook = facebook;
        if (linkedin) profile.social.linkedin = linkedin;
        if (instagram) profile.social.instagram = instagram;

        const newProfile = await Profile.create(profile);
        return res.status(201).json({ status: 'success', data: newProfile });
      }
      const updatedProfile = await Profile.findOneAndUpdate(
        { user: req.user },
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json({ status: 'success', data: updatedProfile });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ status: 'error', error: 'Server error' });
    }
  }

  /**
   * Add Profile Education.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @memberof PostController
   * @returns {JSON} - A JSON success response.
   */
  static async addEducation(req, res) {
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    try {
      const profile = await Profile.findOne({ user: req.user });
      if (!profile) {
        return res
          .status(404)
          .json({ status: 'error', message: 'profile not found' });
      }

      const newEducation = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description,
      };
      profile.education.unshift(newEducation);
      await profile.save();
      res.status(201).json({ status: 'success', data: profile });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ status: 'error', error: 'Server error' });
    }
  }

  /**
   * Delete Profile Education.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @memberof PostController
   * @returns {JSON} - A JSON success response.
   */
  static async deleteEducation(req, res) {
    try {
      const profile = await Profile.findOne({ user: req.user });
      if (!profile) {
        return res
          .status(404)
          .json({ status: 'error', message: 'profile not found' });
      }

      const educationIndexesArray = profile.education.map(
        (education) => education._id
      );
      const index = educationIndexesArray.indexOf(req.params.educationId);
      profile.education.splice(index, 1);
      await profile.save();
      res.status(201).json({ status: 'success', data: profile });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ status: 'error', error: 'Server error' });
    }
  }

  /**
   * Add Profile Experience.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @memberof PostController
   * @returns {JSON} - A JSON success response.
   */
  static async addExperience(req, res) {
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    try {
      const profile = await Profile.findOne({ user: req.user });
      if (!profile) {
        return res
          .status(404)
          .json({ status: 'error', message: 'profile not found' });
      }

      const newExperience = {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
      };
      profile.experience.unshift(newExperience);
      await profile.save();
      res.status(201).json({ status: 'success', data: profile });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ status: 'error', error: 'Server error' });
    }
  }

  /**
   * Delete Profile Experience.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @memberof PostController
   * @returns {JSON} - A JSON success response.
   */
  static async deleteExperience(req, res) {
    try {
      const profile = await Profile.findOne({ user: req.user });
      if (!profile) {
        return res
          .status(404)
          .json({ status: 'error', message: 'profile not found' });
      }

      const experienceIndexesArray = profile.experience.map(
        (experience) => experience._id
      );
      const index = experienceIndexesArray.indexOf(req.params.experienceId);
      profile.experience.splice(index, 1);
      await profile.save();
      res.status(201).json({ status: 'success', data: profile });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ status: 'error', error: 'Server error' });
    }
  }

  /**
   * Delete Profile/Post and user Account.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @memberof PostController
   * @returns {JSON} - A JSON success response.
   */
  static async deleteProfile(req, res) {
    try {
      await Profile.findOneAndRemove({ user: req.user });
      await Post.deleteMany({ user: req.user });
      await User.findOneAndRemove({ _id: req.user });

      res.status(200).json({
        status: 'success',
        message: 'profile, posts and account deleted',
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ status: 'error', error: 'Server error' });
    }
  }

  /**
   * get user's profile.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @memberof PostController
   * @returns {JSON} - A JSON success response.
   */
  static async getProfile(req, res) {
    try {
      const profile = await Profile.findOne({ user: req.user }).populate({
        path: 'user',
        select: 'name avatar',
      });

      if (!profile) {
        return res
          .status(404)
          .json({ status: 'error', error: 'profile not found' });
      }
      res.status(200).json({
        status: 'success',
        data: profile,
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ status: 'error', error: 'Server error' });
    }
  }

  /**
   * get all profile.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @memberof PostController
   * @returns {JSON} - A JSON success response.
   */
  static async getProfiles(req, res) {
    try {
      const profiles = await Profile.find().populate('user', [
        'name',
        'avatar',
      ]);

      res.status(200).json({
        status: 'success',
        count: profiles.length,
        data: profiles,
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ status: 'error', error: 'Server error' });
    }
  }

  /**
   * get user's github repos.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @memberof PostController
   * @returns {JSON} - A JSON success response.
   */
  static async getGithubrepos(req, res) {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${req.params.username}/repos?per_page=10&sort=created:asc&client_id=${process.env.GITHUB_CLIENTID}&client_secret=${process.env.GITHUB_CLIENTSECRET}`
      );

      const data = response.data;
      res
        .status(200)
        .json({ status: 'success', count: data.length, data: data });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ status: 'error', error: 'Server error' });
    }
  }
}

module.exports = ProfileController;
