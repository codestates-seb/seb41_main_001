package com.main_001.server.free.entity;

import com.main_001.server.tag.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FreeTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "FREE_ID")
    private Free free;

    @ManyToOne
    @JoinColumn(name = "TAG_ID")
    private Tag tag;

    public void setFree(Free free) {
        this.free = free;
        if (!this.free.getFreeTags().contains(this)) {
            this.free.getFreeTags().add(this);
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
