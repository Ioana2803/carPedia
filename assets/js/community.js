export class CommunityView {
    constructor(parentElement) {
        this.parentElement = parentElement;
        this.comments = this.loadComments();
        this.username = this.loadUsername();
        this.render();
    }

    render() {
        this.parentElement.innerHTML = "";
        this.renderUsernameBar();
        this.renderForm();
        this.renderComments();
    }

    renderUsernameBar() {
        const bar = document.createElement('div');
        bar.className = "community-username-bar mb-3";
    
        if (!this.username || this.username === "Anonymous") {
            const input = document.createElement('input');
            input.type = "text";
            input.placeholder = "Enter your username";
            input.className = "community-username-input";
            input.maxLength = 20;
            input.autocomplete = "off";

            const setBtn = document.createElement('button');
            setBtn.type = "button"; // important to avoid accidental form behavior
            setBtn.className = "community-username-set-btn";
            setBtn.innerText = "Set Username";

            setBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                const val = input.value.trim();
                if (val.length > 0) {
                    this.username = val;
                    localStorage.setItem("carpedia_community_username", this.username);
                    this.render();
                }
            };

            bar.append(input, setBtn);
        } 
        else {
            // Show username and change button
            const label = document.createElement('span');
            label.className = "community-username-label";
            label.innerHTML = `Username: <b>${this.username}</b>`;
    
            const changeBtn = document.createElement('button');
            changeBtn.type = "button";
            changeBtn.className = "community-username-change-btn";
            changeBtn.innerText = "Change Username";
            changeBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                localStorage.removeItem("carpedia_community_username");
                this.username = "Anonymous";
                this.render();
            };
    
            bar.append(label, changeBtn);
        }
        this.parentElement.appendChild(bar);
    }

    renderForm() {
        const formDiv = document.createElement('div');
        formDiv.className = "community-form mb-4";

        const input = document.createElement('textarea');
        input.className = "community-input";
        input.placeholder = "Share your thoughts about cars, brands, or museums...";

        const postBtn = document.createElement('button');
        postBtn.className = "community-post-btn";
        postBtn.innerText = "Post";

        postBtn.onclick = () => {
            e.preventDefault();
            e.stopPropagation();
            const text = input.value.trim();
            if (text.length === 0) return;
            this.addComment(text);
            input.value = "";
        };

        formDiv.appendChild(input);
        formDiv.appendChild(postBtn);
        this.parentElement.appendChild(formDiv);
    }

    renderComments() {
        const commentsDiv = document.createElement('div');
        commentsDiv.className = "community-comments";
        if (this.comments.length === 0) {
            const empty = document.createElement('p');
            empty.className = "community-empty";
            empty.innerText = "No comments yet. Be the first to share!";
            commentsDiv.appendChild(empty);
        } else {
            this.comments.forEach((comment, idx) => {
                commentsDiv.appendChild(this.createCommentCard(comment, idx));
            });
        }
        // Remove old comments if present
        const old = this.parentElement.querySelector('.community-comments');
        if (old) old.remove();
        this.parentElement.appendChild(commentsDiv);
    }

    createCommentCard(comment, idx) {
        const card = document.createElement('div');
        card.className = "community-comment-card";

        const user = document.createElement('div');
        user.className = "community-comment-user";
        user.innerText = comment.username;

        const text = document.createElement('div');
        text.className = "community-comment-text";
        text.innerText = comment.text;

        const date = document.createElement('div');
        date.className = "community-comment-date";
        date.innerText = new Date(comment.date).toLocaleString();

        const delBtn = document.createElement('button');
        delBtn.className = "community-delete-btn";
        delBtn.innerText = "Delete";
        delBtn.onclick = () => {
            this.deleteComment(idx);
        };

        card.append(user, text, date, delBtn);
        return card;
    }

    addComment(text) {
        this.comments.unshift({
            username: this.username,
            text,
            date: new Date().toISOString()
        });
        this.saveComments();
        this.renderComments();
    }

    deleteComment(idx) {
        this.comments.splice(idx, 1);
        this.saveComments();
        this.renderComments();
    }

    loadComments() {
        try {
            return JSON.parse(localStorage.getItem("carpedia_community_comments") || "[]");
        } catch {
            return [];
        }
    }

    saveComments() {
        localStorage.setItem("carpedia_community_comments", JSON.stringify(this.comments));
    }

    loadUsername() {
        return localStorage.getItem("carpedia_community_username") || "Anonymous";
    }
}