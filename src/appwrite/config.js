import conf from "../conf/conf";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";
export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (err) {
      throw err;
    }
  }
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabseId,
        conf.appwriteCollectionId,
        slug, //document id
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (err) {
      throw err;
    }
  }
  async deletePost({ slug }) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (err) {
      throw err;
    }
  }
  async getPost({ slug }) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (err) {
      return err;
    }
  }
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (err) {
      throw err;
    }
  }
  //file uploade servide
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (err) {
      throw err;
    }
  }
  //delete file
  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
    } catch (err) {
      throw err;
    }
  }
  getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
    } catch (err) {
      throw err;
    }
  }
}

const service = new Service();
export default service;
