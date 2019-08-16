<template>
	<div>
		<v-snackbar v-model="is_visible">
			{{currentMessage}}
			<v-btn icon @click="is_visible = false"><v-icon>close</v-icon></v-btn>
		</v-snackbar>
	</div>
</template>


<script>
	export default {
		name: "notify",
    data: function () {
      return {
        currentMessage: null,
        is_visible: false
      }
		},
		computed: {
			messageLine: function() {
				return this.$store.state.messageLine;
			}
		},
		methods: {
			shiftMessage: function() {
				const newMessage = this.messageLine[0];
				this.currentMessage = newMessage;
				this.is_visible = true;
				this.$store.commit("shift");
			}
		},
		watch: {
			async is_visible(visible) {
				if (visible || !this.messageLine.length) return;
				await this.$nextTick();
				setTimeout(function() {
					this.shiftMessage();
				}, 500);
			},
			messageLine: function() {
				if (!this.is_visible) {
					this.shiftMessage();
				}
			}
		}
	};
</script>
