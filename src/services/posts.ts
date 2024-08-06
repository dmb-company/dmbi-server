import { TransactionBaseService } from "@medusajs/medusa";
import PostRepository from "src/repositories/post";
import { EntityManager } from "typeorm";

type InjectedDependencies = {
  manager: EntityManager;
  postRepository: typeof PostRepository;
};

class PostService extends TransactionBaseService {
  protected postRepository_: typeof PostRepository;
  constructor({ postRepository }: InjectedDependencies) {
    super(arguments[0]);
    this.postRepository_ = postRepository;
  }
  async create(data) {
    return await this.atomicPhase_(async (manager: EntityManager) => {
      const postRepository = manager.withRepository(this.postRepository_);
      console.log("Data received:", data);

      const post = postRepository.create(data);
      console.log("Post created:", post);

      const savedPost = await postRepository.save(post);
      console.log("Post saved:", savedPost);

      return savedPost;
    });
  }
}

export default PostService;
