package codejejus.inddybuddy.post;

import codejejus.inddybuddy.game.GameDto;
import codejejus.inddybuddy.global.dto.SingleResponse;
import codejejus.inddybuddy.global.utils.UriCreator;
import codejejus.inddybuddy.member.entity.MemberPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/games/{game-id}/posts")
public class PostController {

    private final PostService postService;
    private final PostMapper postMapper;


    // Mapper를 클래스, 엔티티에 builder 생성시
    @PostMapping
    public ResponseEntity<PostDto.Response> createPost(@AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                        @RequestBody PostDto.Request requestDto,
                                        @PathVariable("game-id") Long gameId) {
        // Todo : 게임을 선택하고 그 안에 post를 만든다.
        requestDto.addGameId(gameId);
        PostDto.Response PostResponse = postService.createPost(memberPrincipal, requestDto);
        URI uri = UriCreator.createURI(PostResponse.getPostId());

        return ResponseEntity.created(uri).build();
    }

    @PatchMapping("/{post-id}")
    public ResponseEntity<SingleResponse<PostDto.Response>> modifyPost(@PathVariable("post-id") Long postId,
                                                       @AuthenticationPrincipal MemberPrincipal memberPrincipal,
                                                       @RequestBody PostDto.Request requestDto) {
        return ResponseEntity.ok(new SingleResponse<>(postService.modifyPost(postId, memberPrincipal, requestDto)));
    }
}
