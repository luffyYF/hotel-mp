<template>
	<view>
		<uni-popup :show="top" type="top" mode="fixed" msg="顶部弹出popup" @hidePopup="hidePopup(top)"></uni-popup>
		<uni-popup :show="middle" type="middle" mode="fixed" msg="居中弹出popup" @hidePopup="hidePopup(middle)"></uni-popup>
		<uni-popup :show="bottom" type="bottom" mode="fixed" msg="底部弹出popup" @hidePopup="hidePopup(bottom)">
			<view class="bottom-title">分享到</view>
			<view class="bottom-content">
				<view class="bottom-content-box" v-for="(item, index) in bottomData" :key="index">
					<view class="bottom-content-image" :class="item.name">
						<text class="icon">{{ item.icon }}</text>
					</view>
					<view class="bottom-content-text">{{ item.text }}</view>
				</view>
			</view>
		</uni-popup>
		<button type="primary" @tap="onTop()">顶部弹出</button>
		<button type="primary" @tap="onMiddle()">居中弹出</button>
		<button type="primary" @tap="onBottom()">底部弹出</button>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
export default {
	components: {
		uniPopup
	},
	data() {
		return {
			top: false,
			middle: false,
			bottom: false
		};
	},
	methods: {
		onBottom() {
			this.bottom = true;
		},
		onTop() {
			this.top = !this.top;
		},
		hidePopup(flag) {
			this.bottom = false;
		}
	}
};
</script>

<style></style>
