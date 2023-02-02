package com.main_001.server.free.entity;

import com.main_001.server.member.entity.Member;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FreeComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long commentId;

    @Column
    private String body;

    @CreatedDate
    @Column(name = "CREATED_AT", updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "LAST_MODIFIED_AT")
    private LocalDateTime modifiedAt;

    @ManyToOne
    @JoinColumn(name = "FREE_ID")
    private Free free;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void setFree(Free free) {
        this.free = free;
        if (!this.free.getFreeComments().contains(this)) {
            this.free.getFreeComments().add(this);
        }
    }
}
